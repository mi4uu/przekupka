import React from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";

export default function TopBar({ store }: { store: IState }) {


  return <div className="p-d-flex p-p-3 card p-jc-center p-shadow-1">
  {Object.entries(store.balance).map(([coin, value], i, { length }) => (
    <div className={'p-mr-2'} key={coin}>
      <Button type="button" label={value} className="p-button-warning" />
      <Button type="button" label={coin} />
   
    </div>
  ))}
</div>
}
