<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $table = "events";
    protected $fillable = ['code', 'date_expired'];

    public function event_registers() {
        return $this->hasMany('App\MasterComponentCategories', 'event_id');
    }
}
