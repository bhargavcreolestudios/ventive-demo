<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductsController extends Controller
{
    /**
     * Get list of products
     * @return {object} default response with list of products
     */
    public function index(Request $request)
    {
        $products = Product::select('*');
        if ($request->has('search')) {
            $search   = $request->search;
            $products = $products->where('name', 'like', '%' . $search . '%')->orWhereHas('category', function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
            });
        }
        $products = $products->with('category', 'user')->desc()->paginate(10)->toArray();
        return UtilityController::Generateresponse(1, '', Response::HTTP_OK, $products);
    }

    /**
     * To get single product details
     * @param  integer $id product id
     * @return {object}     default response with product details
     */
    public function show($id)
    {
        try {
            $product = Product::find($id);
            if ($product) {
                $product->inventory;
                $product->category;
                $product->user;
                return UtilityController::Generateresponse(1, '', Response::HTTP_OK, $product);
            } else {
                return UtilityController::Generateresponse(1, 'NO_PRODUCT', Response::HTTP_BAD_REQUEST, '');
            }
        } catch (\Exception $e) {
            return UtilityController::Generateresponse(1, 'GENERAL_ERROR', Response::HTTP_BAD_REQUEST, '');
        }
    }

    /**
     * Create new product
     * @param  Request $request  laravel request
     * @return {object}          default response with new product data
     */
    public function create(Request $request)
    {
        try {
            \DB::beginTransaction();
            // assigning validation rules
            $rules = [
                'name'        => 'required',
                'category_id' => 'required|exists:categories,id',
            ];
            // Execute validation.
            $validator = \Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                // implode messages
                $messages = implode(" & ", $validator->messages()->all());
                return UtilityController::Generateresponse(0, $messages, Response::HTTP_BAD_REQUEST, '');
            } else {
                //  create a new product
                $newProduct = $request->user()->product()->create($request->all());
                if ($newProduct) {
                    //  if everything is good, commit transaction and return success response
                    \DB::commit();
                    return UtilityController::Generateresponse(1, 'PRODUCT_CREATED', Response::HTTP_OK, $newProduct);
                }
            }
            return UtilityController::Generateresponse(1, 'GENERAL_ERROR', Response::HTTP_BAD_REQUEST, '');
        } catch (\Exception $e) {
            \DB::rollback();
            // return general response if something went wrong
            return UtilityController::Generateresponse(1, 'GENERAL_ERROR', Response::HTTP_BAD_REQUEST, '');
        }
    }

    /**
     * update product
     * @param  [type]  $id      [description]
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function update(Request $request)
    {
        try {
            \DB::beginTransaction();
            // assigning validation rules
            $rules = [
                'name'        => 'required',
                'category_id' => 'required|exists:categories,id',
                'id'          => 'required|exists:products,id',
            ];
            // Execute validation.
            $validator = \Validator::make($request->all(), $rules);
            if ($validator->fails()) {
                // implode messages
                $messages = implode(" & ", $validator->messages()->all());
                return UtilityController::Generateresponse(0, $messages, Response::HTTP_BAD_REQUEST, '');
            } else {
                $product = Product::find($request->id);
                if ($product && $product->update($request->all())) {
                    \DB::commit();
                    return UtilityController::Generateresponse(1, 'PRODUCT_UPDATED', Response::HTTP_OK);
                }
            }
            return UtilityController::Generateresponse(1, 'GENERAL_ERROR', Response::HTTP_BAD_REQUEST, '');
        } catch (\Exception $e) {
            \DB::rollback();
            // return general response if something went wrong
            return UtilityController::Generateresponse(1, 'GENERAL_ERROR', Response::HTTP_BAD_REQUEST, '');
        }
    }

    /**
     * Delete product
     * @param  int $id product id
     * @return object     default response with message
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product) {
            $product->delete();
            return UtilityController::Generateresponse(1, 'PRODUCT_DELETED', Response::HTTP_OK, '');
        } else {
            return UtilityController::Generateresponse(1, 'NO_PRODUCT', Response::HTTP_BAD_REQUEST, '');
        }
    }
}
