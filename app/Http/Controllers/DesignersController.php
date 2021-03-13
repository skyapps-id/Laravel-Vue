<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Designers;


class DesignersController extends Controller
{
    //
    public function index(Request $request)
    {
        $q = !is_null($request->input('q')) ? $request->input('q') : "";
		$page = !is_null($request->input('page')) ? $request->input('page') : "1";
        $limit = !is_null($request->input('limit')) ? $request->input('limit') : "10";

        $designers =   Designers::when($q, function ($query) use ($q) {
                                return $query->where('name', 'like', '%'.$q.'%');
                            })
                            ->orderBy('id', 'desc')
                            ->offset(($page - 1) * $limit)
                            ->limit($limit)
                            ->get();
        
        $designersCount =  Designers::when($q, function ($query) use ($q) {
                                    return $query->where('name', 'like', '%'.$q.'%');
                                })
                                ->count();
 
        return response()->json([
			'data' => $designers, 
			'total_all' => $designersCount,
		], 200);
    }
 
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
        ];

        $validator = Validator::make($request->json()->all(), $rules);
        if ($validator->passes()) {
            //TODO Handle your data
            $project = Designers::create([
                'name' => $request->input('name'),
            ]);
     
            $msg = [
                'success' => true,
                'message' => 'Designers created successfully!'
            ];
     
            return response()->json($msg);
        } else {
            //TODO Handle your error
            return response()->json($validator->errors()->all());
        }
        
    }
 
    public function getDesigners($id) // for edit and show
    {
        $event = Designers::find($id);
 
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
            $event = Designers::find($id);
            $event->name = $request->input('name');
            $event->save();
    
            $msg = [
                'success' => true,
                'message' => 'Designers updated successfully'
            ];
    
            return response()->json($msg);
        } else {
            //TODO Handle your error
            return response()->json($validator->errors()->all());
        }
        
    }
 
    public function delete($id)
    {
        $event = Designers::find($id);
        if(!empty($event)){
            $event->delete();
            $msg = [
                'success' => true,
                'message' => 'Designers deleted successfully!'
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'Designers deleted failed!'
            ];
            return response()->json($msg);
        }
    }
}
