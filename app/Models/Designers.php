<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Designers extends Model
{
    use HasFactory;

    protected $table = "designers";
    protected $fillable = ['name'];
}
