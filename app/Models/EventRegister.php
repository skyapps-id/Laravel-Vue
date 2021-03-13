<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRegister extends Model
{
    use HasFactory;

    protected $table = "event_registers";
    protected $fillable = ['uuid', 'email', 'event_id', 'status_id', 'create_user_id'];

    public function status(){
        return $this->belongsTo('App\Models\Status', 'status_id');
    }
    
    public function event(){
        return $this->belongsTo('App\Models\Event', 'event_id');
    }

    public function person(){
        return $this->belongsTo('App\Models\Person', 'email', 'email');
    }
}
