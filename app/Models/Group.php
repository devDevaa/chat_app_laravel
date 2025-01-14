<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Group extends Model
{
    use HasFactory;
    protected $fillable = ["name", "description", "owner_id", "last_message _id"];

    public function users() {
        return $this->belongsToMany(User::class, "group_users");
    }

    public function owner() {
        return $this->belongsTo(User::class);
    }

    public function messages() {
        return $this->hasMany(Message::class);
    }
}
