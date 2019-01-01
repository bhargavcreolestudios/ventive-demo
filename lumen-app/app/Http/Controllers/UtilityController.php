<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class UtilityController extends Controller
{
    /**
     * Common response format
     * @param integer $type         response type wheter call succeed or not
     * @param string  $message      response message
     * @param integer $statusCode   response statusCode
     * @param array   $responseData data in response if have any
     */
    public static function Generateresponse($type = 0, $message = "", $statusCode = 200, $responseData = array())
    {
        $returnData           = [];
        $returnData['status'] = $type;

        if (Config('constant.messages.' . $message) != '') {
            $returnData['message'] = Config('constant.messages.' . $message);
        } else {
            $returnData['message'] = $message;
        }
        $returnData['status_code'] = $statusCode;
        $returnData['data']        = ($responseData != '') ? $responseData : (object) [];

        return response($returnData, $statusCode);

    }
}
