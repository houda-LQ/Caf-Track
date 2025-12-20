<?php

namespace App\Listeners;

use App\Events\EmployeCreated;
use App\Mail\EmployeCreatedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendEmployeCreatedEmail
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(EmployeCreated $event)
    {
        Mail::to($event->user->email)->send(new EmployeCreatedMail($event->user));
    }
}
