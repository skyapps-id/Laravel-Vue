<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->delete();

        DB::table('users')->insert([
            'name' => 'Aji Indra Jaya',
            'email' => 'ajiedafuq@gmail.com',
            'password' => '$2y$10$lV6uT9kgu8nheWDjm6yXvuINvrii.Bz0tfXPAMQS9AJjuVo/wSa9q',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}
