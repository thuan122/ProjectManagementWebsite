<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Toryu',
            'email' => 'toryu@gmail.com',
            'password' => bcrypt("password"),
            'email_verified_at' => time(),
        ]);

        // Create fake 30 project
        Project::factory()
            ->count(30)
            ->hasTasks(30)
            ->create();
    }
}
