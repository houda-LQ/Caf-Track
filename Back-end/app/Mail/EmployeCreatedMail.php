<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmployeCreatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function build()
    {
        return $this
            ->subject('Bienvenue dans CaféTrack')
            ->html("
                <h1>Bienvenue {$this->user->name}</h1>
                <p>Votre compte a été créé avec succès.</p>
                <p><strong>Email :</strong> {$this->user->email}</p>
            ");
    }
}
