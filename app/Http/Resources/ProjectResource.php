<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * This will remove the 'data' wrapper when get data object
     * normally it would look like this
     * data {
     *      prop1:{}
     *      prop2: data
     * }
     */
    public static $wrap = null;
    /**
     * Transform the resource into an array.
     * 
     * Basically, it limited the amount of data that return to the view
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('d-m-Y'),
            'due_date' => (new Carbon($this->due_date))->format('d-m-Y'),
            'status' => $this->status,
            'image_path' => $this->image_path,
            'createdBy' => (new UserResource($this->createdBy)),
            'updatedBy' => (new UserResource($this->updatedBy)),
        ];
    }
}
