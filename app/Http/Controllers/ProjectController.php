<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use Illuminate\Pagination\AbstractPaginator;
use Inertia\Inertia;

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
        $sortFields = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        if (request("name")) {
            $query = $query->where("name", "like", "%" . request("name") . "%");
        }

        if (request("status")) {
            $query = $query->where("status", request("status"));
        }

        $projects = $query
                        ->orderBy($sortFields, $sortDirection)
                        ->paginate(10)
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
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
