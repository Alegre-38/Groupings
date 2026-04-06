<?php

namespace App\Http\Controllers;

use App\Models\Affiliation;
use Illuminate\Http\Request;

class AffiliationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Affiliation $affiliation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Affiliation $affiliation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Affiliation $affiliation)
    {
        //
    }

    public function promoteRole(Request $request, $id)
    {
        $request->validate(['Role' => 'required|string']);
        $affiliation = \App\Models\Affiliation::findOrFail($id);
        $affiliation->promoteRole($request->input('Role'));
        return response()->json(['message' => 'Role promoted successfully.', 'affiliation' => $affiliation]);
    }
}
