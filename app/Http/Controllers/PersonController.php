<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Person;
use App\Jobs\SendEmailJob;
use Carbon\Carbon;


class PersonController extends Controller
{
    //
    public function index(Request $request)
    {
        $q = !is_null($request->input('q')) ? $request->input('q') : "";
		$page = !is_null($request->input('page')) ? $request->input('page') : "1";
        $limit = !is_null($request->input('limit')) ? $request->input('limit') : "10";

        $persons =   Person::when($q, function ($query) use ($q) {
                                return $query->where('name', 'like', '%'.$q.'%')->orWhere('email', 'like', '%'.$q.'%');
                            })
                            ->orderBy('id', 'desc')
                            ->offset(($page - 1) * $limit)
                            ->limit($limit)
                            ->get();
        
        $personsCount =  Person::when($q, function ($query) use ($q) {
                                    return $query->where('name', 'like', '%'.$q.'%')->orWhere('email', 'like', '%'.$q.'%');
                                })
                                ->count();
 
        return response()->json([
			'data' => $persons, 
			'total_all' => $personsCount,
		], 200);
    }
 
    public function store(Request $request)
    {
        $rules =[
          'email' => 'required',
          'name' => 'required',
          'birthday' => 'required',
          'sex' => 'required',
          'designer' => 'required',
        ];

        $validator = Validator::make($request->json()->all(), $rules);
        $project = Person::create([
            'email' => $request->input('email'),
            'name' =>$request->input('name'),
            'birthday' =>$request->input('birthday'),
            'sex' =>$request->input('sex'),
            'designers' =>$request->input('designers'),
        ]);

        if($project) {

            $send_mail = $request->input('email');
            $content = [
                'subject' => 'Event HuntStreet Apply',
                'title' => 'Congrats you have ticket event HuntStreet',
                'body' => 'Thank for submit',
                'method' => 'ack'
            ];

            SendEmailJob::dispatch($send_mail, $content)->delay(Carbon::now()->addMinutes(60));
        }
 
        $msg = [
            'success' => true,
            'message' => 'Person created successfully!'
        ];
 
        return response()->json($msg);
    }
 
    public function getPerson($id) // for edit and show
    {
        $person = Person::find($id);
 
        return response()->json($person);
    }

    public function getByEmailPerson($email) // for edit and show
    {
        $person = Person::where('email', '=', $email)->first();
 
        return response()->json($person);
    }
 
    public function update(Request $request, $email)
    {
        $rules =[
            'name' => 'required',
            'birthday' => 'required',
            'sex' => 'required',
            'designers' => 'required',
          ];
  
        $validator = Validator::make($request->json()->all(), $rules);
        $person = Person::where('email', '=', $email)->first();
        $person->name =$request->input('name');
        $person->birthday =$request->input('birthday');
        $person->sex =$request->input('sex');
        $person->designers =$request->input('designers');
        $person->save();
 
        $msg = [
            'success' => true,
            'message' => 'Person updated successfully'
        ];
 
        return response()->json($msg);
    }
 
    public function delete($id)
    {
        $person = Person::find($id);
        if(!empty($person)){
            $person->delete();
            $msg = [
                'success' => true,
                'message' => 'Person deleted successfully!'
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'Person deleted failed!'
            ];
            return response()->json($msg);
        }
    }
}
