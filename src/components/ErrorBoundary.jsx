import { Component } from 'react';
export default class ErrorBoundary extends Component {
 state = { failed: false };
 static getDerivedStateFromError() { return { failed: true }; }
 render() { return this.state.failed ? <section className="card" role="alert"><h2 className="text-lg font-bold">This section couldn’t open.</h2><p className="my-4 text-muted">Check your connection and reload. Reloading will reset this demo’s test.</p><button className="btn btn-primary" onClick={() => window.location.reload()}>Reload app</button></section> : this.props.children; }
}
