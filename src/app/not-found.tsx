import React from 'react';
import { Btn } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="page-head" style={{ borderBottom: 0 }}>
      <p className="eyebrow">Error 404</p>
      <h1>Page <em>not found</em>.</h1>
      <p className="lede">The requested handbook or research digest could not be located. It may have moved, or the link may be mistyped.</p>
      <div className="page-actions">
        <Btn href="/">Return home</Btn>
        <Btn href="/archive/" variant="ghost" trailing={null}>Browse the archive</Btn>
      </div>
    </div>
  );
}
