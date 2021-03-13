<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Status;


class EventStatusController extends Controller
{
    //
    public function index()
    {
        $events = Status::all();
 
        return response()->json($events);
    }
 
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
        ];

        $validator = Validator::make($request->json()->all(), $rules);
        if ($validator->passes()) {
            //TODO Handle your data
            $project = Status::create([
                'name' => $request->input('name'),
            ]);
     
            $msg = [
                'success' => true,
                'message' => 'Status created successfully!'
            ];
     
            return response()->json($msg);
        } else {
            //TODO Handle your error
            return response()->json($validator->errors()->all());
        }
        
    }
 
    public function getStatus($id) // for edit and show
    {
        $event = Status::find($id);
 
        return response()->json($event);
    }
 
    public function update(Request $request, $id)
    {
        $rules = [
            'name' => 'required',
        ];
        $validator = Validator::make($request->json()->all(), $rules);
        if ($validator->passes()) {
            //TODO Handle your data
            $event = Status::find($id);
            $event->name = $request->input('name');
            $event->save();
    
            $msg = [
                'success' => true,
                'message' => 'Status updated successfully'
            ];
    
            return response()->json($msg);
        } else {
            //TODO Handle your error
            return response()->json($validator->errors()->all());
        }
        
    }
 
    public function delete($id)
    {
        $event = Status::find($id);
        if(!empty($event)){
            $event->delete();
            $msg = [
                'success' => true,
                'message' => 'Status deleted successfully!'
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'Status deleted failed!'
            ];
            return response()->json($msg);
        }
    }
}
