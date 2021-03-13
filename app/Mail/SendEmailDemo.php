<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmailDemo extends Mailable
{
    use Queueable, SerializesModels;

    public $content;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($content)
    {
        //
        $this->content = $content;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        if($this->content['method'] == 'invite') {
            return $this->subject($this->content['subject'])
                ->view('email.invite');
        } elseif($this->content['method'] == 'ack') {
            return $this->subject($this->content['subject'])
                ->view('email.ack');
        }
    }
}
