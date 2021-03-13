<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PersonTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('persons')->delete();

        DB::table('persons')->insert([
            [
                'email' => 'ajiedafuq@gmail.com',
                'name' => 'Aji Indra Jaya',
                'birthday' => '1996-11-25',
                'sex' => 'Men',
                'designers' => 'ParisPersolPeter|PilottoPeter|Pilotto',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'email' => 'eten@example.com',
                'name' => 'Eten',
                'birthday' => '1996-01-30',
                'sex' => 'Men',
                'designers' => 'JoePaul|AndrewPaul|SmithPaula',
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]
        ]);
    }
}
