<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function index()
    {
        $this->authorize('manage', Setting::class);

        $setting = Setting::first(); 
        return response()->json($setting);
    }


     public function update(Request $request, Setting $setting)
    {
        $this->authorize('manage', $setting);

        $data = $request->only(['shop_name', 'tva_rate', 'min_stock']);

        if ($request->hasFile('logo')) {
            if ($setting->logo) {
                Storage::delete($setting->logo);
            }
            $data['logo'] = $request->file('logo')->store('logos', 'public');
        }

        $setting->update($data);

        return response()->json([
            'message' => 'Paramètres mis à jour avec succès',
            'setting' => $setting
        ]);
    }
}
