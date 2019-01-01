<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventories', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->unsigned();
            $table->integer('user_id')->comment('Who have added/issued stock')->unsigned();
            $table->integer('opening_stock')->default(0);
            $table->tinyInteger('action_type')->comment('1=>added, 2=>issued')->default(1);
            $table->integer('action_amount')->default(0);
            $table->integer('current_stock')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('inventories', function ($table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['product_id']);
        });
        Schema::drop('inventories');
    }
}
