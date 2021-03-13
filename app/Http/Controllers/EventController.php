<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Event;

class EventController extends Controller
{
    //
    public function index(Request $request)
    {
        $q = !is_null($request->input('q')) ? $request->input('q') : "";
		$page = !is_null($request->input('page')) ? $request->input('page') : "1";
        $limit = !is_null($request->input('limit')) ? $request->input('limit') : "10";

        $events =   Event::when($q, function ($query) use ($q) {
                                return $query->where('code', 'like', '%'.$q.'%');
                            })
                            ->orderBy('id', 'desc')
                            ->offset(($page - 1) * $limit)
                            ->limit($limit)
                            ->get();
        
        $eventsCount =  Event::when($q, function ($query) use ($q) {
                                    return $query->where('code', 'like', '%'.$q.'%');
                                })
                                ->count();
 
        return response()->json([
			'data' => $events, 
			'total_all' => $eventsCount,
		], 200);
    }
 
    public function store(Request $request)
    {
        $rules = [
            'code' => 'required',
            'date_expired' => 'required',
        ];

        $validator = Validator::make($request->json()->all(), $rules);
        if ($validator->passes()) {
            //TODO Handle your data
            $project = Event::create([
                'code' => $request->input('code'),
                'date_expired' => $request->input('date_expired'),
            ]);
     
            $msg = [
                'success' => true,
                'message' => 'Event created successfully!'
            ];
     
            return response()->json($msg);
        } else {
            //TODO Handle your error
            return response()->json($validator->errors()->all());
        }
    }
 
    public function getEvent($id) // for edit and show
    {
        $event = Event::find($id);
 
        return response()->json($event);
    }
 
    public function update(Request $request, $id)
    {
        $rules = [
            'date_expired' => 'required',
        ];
 
        $validator = Validator::make($request->json()->all(), $rules);
        if ($validator->passes()) {
            //TODO Handle your data
            $event = Event::find($id);
            $event->date_expired = $request->input('date_expired');
            $event->save();
 
            $msg = [
                'success' => true,
                'message' => 'Event updated successfully'
            ];
    
            return response()->json($msg);
        } else {
            //TODO Handle your error
            return response()->json($validator->errors()->all());
        }
        
    }
 
    public function delete($id)
    {
        $event = Event::find($id);
        if(!empty($event)){
            $event->delete();
            $msg = [
                'success' => true,
                'message' => 'Event deleted successfully!'
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'Event deleted failed!'
            ];
            return response()->json($msg);
        }
    }
}
