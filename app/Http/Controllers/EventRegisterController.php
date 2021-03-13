<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\SendEmailJob;
use Illuminate\Support\Facades\Validator;
use App\Models\EventRegister;
use Illuminate\Support\Str;


class EventRegisterController extends Controller
{
    //
    public function index(Request $request)
    {
        $q = !is_null($request->input('q')) ? $request->input('q') : "";
		$status = !is_null($request->input('status')) ? $request->input('status') : "";
		$event = !is_null($request->input('event')) ? $request->input('event') : "";
		$page = !is_null($request->input('page')) ? $request->input('page') : "1";
        $limit = !is_null($request->input('limit')) ? $request->input('limit') : "10";

        $eventsRegister =   EventRegister::when($q, function ($query) use ($q) {
                                return $query->where('email', 'like', '%'.$q.'%');
                            })
                            ->when($status, function ($query) use ($status) {
                                return $query->where('status_id', '=', $status);
                            })
                            ->when($event, function ($query) use ($event) {
                                return $query->where('event_id', '=', $event);
                            })
                            ->with('event:id,code,date_expired', 'status:id,name')
                            ->orderBy('id', 'desc')
                            ->offset(($page - 1) * $limit)
                            ->limit($limit)
                            ->get();
        
        $eventsRegisterCount =  EventRegister::when($q, function ($query) use ($q) {
                                    return $query->where('email', 'like', '%'.$q.'%');
                                })
                                ->when($status, function ($query) use ($status) {
                                    return $query->where('status_id', '=', $status);
                                })
                                ->when($event, function ($query) use ($event) {
                                    return $query->where('event_id', '=', $event);
                                })
                                ->with('event:id,code,date_expired', 'status:id,name')
                                ->count();
 
        return response()->json([
			'data' => $eventsRegister, 
			'total_all' => $eventsRegisterCount,
		], 200);
    }
 
    public function store(Request $request)
    {
        $rules = [
            'email' => 'required|email',
            'event_id'  => 'required',
        ];

        $validator = Validator::make($request->json()->all(), $rules);
        if ($validator->passes()) {
            //TODO Handle your data
            $uuid = Str::uuid()->toString();
            $project = EventRegister::create([
                'uuid' => $uuid,
                'email' => $request->input('email'),
                'event_id'  => $request->input('event_id'),
                'status_id'  => 1,
                'create_user_id' => 1,
            ]);

            if($project) {

                $send_mail = $request->input('email');
                $content = [
                    'subject' => 'Event HuntStreet HUNTBAZAAR',
                    'title' => 'Have a chance have ticket event HuntStreet',
                    'body' => 'Thank for submite',
                    'link' => env("APP_URL") . '/register/event/' . $uuid,
                    'method' => 'invite'
                ];
    
                SendEmailJob::dispatch($send_mail, $content);
            }

            $msg = [
                'success' => true,
                'message' => 'EventRegister created successfully!'
            ];
     
            return response()->json($msg);
        } else {
            //TODO Handle your error
            return response()->json($validator->errors()->all());
        }
    }
 
    public function getEventRegister($id) // for edit and show
    {
        $event = EventRegister::with('event:id,code,date_expired', 'status:id,name')->find($id);
 
        return response()->json($event);
    }

    public function getByUuidEventRegister($uuid) // for edit and show
    {
        $event = EventRegister::with('event:id,code,date_expired', 'person:id,email', 'status:id,name')->where('uuid', '=', $uuid)->first();
        
        if(!is_null($event)) {
            return response()->json([
                'email' => $event['email'],
                'date_expired' => $event['event']['date_expired'],
                'code' => $event['event']['code'],
                'status' => $event['status']['name'],
                'person_is_exists' => !is_null($event['person']) ? true : false,
            ], 200);
        } else {
            return response()->json($event, 200);
        }
    }
 
    public function update(Request $request, $id)
    {
        $rules = [
            'event_id'  => 'required',
        ];

        $validator = Validator::make($request->json()->all(), $rules);
        if ($validator->passes()) {
            //TODO Handle your data
            $event = EventRegister::find($id);
            $event->event_id = $request->input('event_id');
            $event->save();
    
            $msg = [
                'success' => true,
                'message' => 'EventRegister updated successfully'
            ];
 
            return response()->json($msg);
        } else {
            //TODO Handle your error
            return response()->json($validator->errors()->all());
        }
    }
 
    public function delete($id)
    {
        $event = EventRegister::find($id);
        if(!empty($event)){
            $event->delete();
            $msg = [
                'success' => true,
                'message' => 'EventRegister deleted successfully!'
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'EventRegister deleted failed!'
            ];
            return response()->json($msg);
        }
    }
}
