<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $table = "statuses";
    protected $fillable = ['name'];

    public function event_registers() {
        return $this->hasMany('App\MasterComponentCategories', 'status_id');
    }
}
