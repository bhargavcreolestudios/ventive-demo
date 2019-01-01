<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Category;
use Illuminate\Http\Response;

class CategoriesController extends Controller
{
    /**
     * categories list
     * @return {object} list of categories with default response
     */
    public function index()
    {
        $categories = Category::all();
        return UtilityController::Generateresponse(1, '', Response::HTTP_OK, $categories);
    }
}
