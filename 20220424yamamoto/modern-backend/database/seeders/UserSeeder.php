<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Like;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 5; $i++) {
            if ($i === 0) { 
                User::factory()->count(1)
                ->has(
                    Post::factory()
                    ->count(1) 
                    ->state(function (array $attributes, User $user) {
                        return ['user_id' => $user->id];
                    })
                )
                ->create();
            } else {
                User::factory()->count(1)
                ->has(
                    Post::factory()
                    ->count(1)
                    ->state(function (array $attributes, User $user) {
                        return ['user_id' => $user->id];
                    })
                    ->has(
                        Comment::factory()
                        ->count(1)
                        ->state(function (array $attributes, Post $post) {
                            return [
                                'user_id' => $post->user_id - 1,
                                'post_id' => $post->id,
                            ];
                        })
                    )
                    ->has(
                        Like::factory()
                        ->count(1)
                        ->state(function (array $attributes, Post $post) {
                            return [
                                'user_id' => $post->user_id - 1,
                                'post_id' => $post->id,
                            ];
                        })
                    )
                )
                ->create();
            }
        }
        Comment::factory()
            ->count(1)
            ->state(function () {
                    return [
                        'user_id' => 1,
                        'post_id' => 5,
                    ];
            });
        Like::factory()
        ->count(1)
        ->state(function () {
                return [
                    'user_id' => 1,
                    'post_id' => 5,
                ];
        });
        
    }
}
