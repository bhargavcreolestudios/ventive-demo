<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Inventory extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'inventories';

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['created_at','updated_at','deleted_at'];


    /**
     * Fields that can be mass assigned.
     *
     * @var array
     */
    protected $fillable = ['product_id','user_id','opening_stock','action_type','action_amount','current_stock'];
}
