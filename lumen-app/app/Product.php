<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Product extends Model
{
    use SoftDeletes;

    protected $appends = ['product_date'];
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'products';

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    /**
     * Fields that can be mass assigned.
     *
     * @var array
     */
    protected $fillable = ['category_id', 'user_id', 'name'];

    /**
     * Product belongs to Category.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Product belongs to User.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Accessor for productDate attribute.
     *
     * @return returnType
     */
    public function getProductDateAttribute($value)
    {
        $date = new Carbon($this->created_at);
        return $date->format('M-d-Y');
    }

    /**
     * Query scope desc.
     *
     * @param  \Illuminate\Database\Eloquent\Builder
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDesc($query)
    {
        return $query->orderBy('id','desc');
    }

    /**
     * Product has many Inventory.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function inventory()
    {
        return $this->hasMany(Inventory::class);
    }
}
