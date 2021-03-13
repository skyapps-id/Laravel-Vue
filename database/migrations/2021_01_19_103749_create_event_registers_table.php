<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventRegistersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_registers', function (Blueprint $table) {
            $table->id();
            $table->string('uuid', 36);
            $table->string('email', 100);
            $table->bigInteger('event_id')->unsigned();
            $table->bigInteger('status_id')->unsigned();
            $table->bigInteger('create_user_id')->unsigned();
            $table->timestamps();
            $table->foreign('event_id')->references('id')->on('events');
            $table->foreign('status_id')->references('id')->on('statuses');
            $table->foreign('create_user_id')->references('id')->on('users');
        });

        /* Schema::table('event_registers', function (Blueprint $table) {
            $table->foreign('event_id')->references('id')->on('events');
            $table->foreign('status_id')->references('id')->on('statuses');
        }); */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_registers');
    }
}
