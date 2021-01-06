import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Params({store,pair}:{store:IState,pair:string}){


return    <div className="card">
<h5>Parameters</h5>
<DataTable value={transactions} scrollable scrollHeight="200px" >
<Column field="date" header="Date"></Column>
    <Column field="type" header="Type"></Column>
    <Column field="volume" header="Volume"></Column>
    <Column field="price" header="Price"></Column>
    <Column field="fee" header="Fee"></Column>
    <Column field="status" header="Status"></Column>
</DataTable>
</div>
}