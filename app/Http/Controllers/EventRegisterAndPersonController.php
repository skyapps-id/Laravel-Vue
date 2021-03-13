<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\SendEmailJob;
use Illuminate\Support\Facades\Validator;
use App\Models\EventRegister;
use App\Models\Person;
use Illuminate\Support\Str;
use Carbon\Carbon;
use DB;



class EventRegisterAndPersonController extends Controller
{
    //
    public function updateStatusAndDesigners(Request $request, $uuid)
    {
        $rules = [
            'designers'  => 'required',
        ];

        $validator = Validator::make($request->json()->all(), $rules);
        if ($validator->passes()) {
            //TODO Handle your data
            DB::beginTransaction();

            $email;
            try {
              $event = EventRegister::where('uuid', '=', $uuid)->first();
              $event->status_id = 2;
              $event->save();
              $email = $event->email;
            } catch (\Exception $e) {
              //return error message
              DB::rollback();
              return response()->json(['success' => false, 'message' => 'Update Status Failed!', 'error' => $e->getMessage()], 409);
            }

            try {
              $person = Person::where('email', '=', $event->email)->first();
              $person->designers = $request->input('designers');
              $person->save();

              // Auto Send Email
              if($person) {
                $send_mail = $email;
                $content = [
                    'subject' => 'Event HuntStreet Apply',
                    'title' => 'Congrats you have ticket event HuntStreet',
                    'body' => 'Thank for submit',
                    'method' => 'ack'
                ];
    
                SendEmailJob::dispatch($send_mail, $content)->delay(Carbon::now()->addMinutes(60));
              }
            } catch (\Exception $e) {
              //return error message
              DB::rollback();
              return response()->json(['success' => false, 'message' => 'Update Designers Failed!', 'error' => $e->getMessage()], 409);
            }

            DB::commit();

            

            $msg = [
                'success' => true,
                'message' => 'EventRegister status updated successfully'
            ];
 
            return response()->json($msg);
        } else {
            //TODO Handle your error
            return response()->json($validator->errors()->all());
        }
    }

    public function updateStatusAndCreatePerson(Request $request, $uuid)
    {
        $rules = [
            'designers'  => 'required',
        ];

        $validator = Validator::make($request->json()->all(), $rules);
        if ($validator->passes()) {
            //TODO Handle your data
            DB::beginTransaction();

            $email;
            try {
              $event = EventRegister::where('uuid', '=', $uuid)->first();
              $event->status_id = 2;
              $event->save();
              $email = $event->email;
            } catch (\Exception $e) {
              //return error message
              DB::rollback();
              return response()->json(['success' => false, 'message' => 'Update Status Failed!', 'error' => $e->getMessage()], 409);
            }

            try {
              $person = Person::create([
                'email' => $email,
                'name' =>$request->input('name'),
                'birthday' =>$request->input('birthday'),
                'sex' =>$request->input('sex'),
                'designers' =>$request->input('designers'),
              ]);

              // Auto Send Email
              if($person) {
                $send_mail = $email;
                $content = [
                    'subject' => 'Event HuntStreet Apply',
                    'title' => 'Congrats you have ticket event HuntStreet',
                    'body' => 'Thank for submit',
                    'method' => 'ack'
                ];
    
                SendEmailJob::dispatch($send_mail, $content)->delay(Carbon::now()->addMinutes(1));
              }
            } catch (\Exception $e) {
              //return error message
              DB::rollback();
              return response()->json(['success' => false, 'message' => 'Update Designers Failed!', 'error' => $e->getMessage()], 409);
            }

            DB::commit();

            

            $msg = [
                'success' => true,
                'message' => 'EventRegister status updated successfully'
            ];
 
            return response()->json($msg);
        } else {
            //TODO Handle your error
            return response()->json($validator->errors()->all());
        }
    }
}
