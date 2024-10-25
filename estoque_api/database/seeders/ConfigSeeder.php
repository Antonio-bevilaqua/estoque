<?php

namespace Database\Seeders;

use App\Models\Configuration;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Configuration::query()->create([
            'company' => "Me Lambuzei",
            'cnpj' => "46188053000189",
            'whatsapp' => "35997038871",
            'phone' => "35997038871",
            'email' => "yurismpintowow@gmail.com"
        ]);
    }
}
