<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Support\Str;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Pagination\AbstractPaginator;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        /**
         * Get search condition from the request
         */
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query = $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query = $query->where("status", request("status"));
        }

        $projects = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            // ->append(request()->query())
        ;
        /**
         * Return to Inertia view, so that it will render to React.js view (JSX file)
         * instead of using Blade template of Laravel
         */
        return Inertia::render('Project/Index', [
            'projects' => ProjectResource::collection($projects),
            // Send back to the client the query params, so that it will keep remain
            'queryParams' => request()->query() ?: null,
            // Get the 'success' session's value
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Project/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        // TODO: Should make this check for permission before creating
        $data = $request->validated();
        /** @var $image object | \Illuminated\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if ($image) {
            // If the IDE or text editor marked this with an error
            // it's not
            $data['image_path'] = $image->store('project/' . Str::snake($data['name']), 'public');
        }

        Project::create($data);

        return to_route('project.index')->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // Get all the tasks from the project by using the relationship
        $query = $project->tasks();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }
        $tasks = $query
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            ->onEachSide(1);

        return Inertia::render("Project/Show", [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('Project/Edit', [
            'project' => new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($project->image_path) {
                // Delete the old image
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] = $image->store('project/' . Str::snake($data['name']), 'public');
        }
        $project->update($data);

        return to_route("project.index")->with('success', "Project " . $project->name . " updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // TODO: Should be soft delete, and preserve old image
        $project->delete();
        // Also remove the image when deleting project
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }

        return to_route('project.index')->with('success',  "Project " . $project->name . " deleted successfully");
    }
}
