<?php

namespace App\Listeners;

use App\Events\EmployeCreated;
use App\Mail\EmployeCreatedMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendEmployeCreatedEmail implements ShouldQueue
{
    public function handle(EmployeCreated $event)
    {
        Mail::to($event->user->email)
            ->send(new EmployeCreatedMail($event->user));
    }
}
