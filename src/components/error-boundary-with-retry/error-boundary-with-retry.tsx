import React from "react";
import styles from "./error-boundary-with-retry.module.scss";
import iceCream from "./images/iceCream.svg";

interface OwnState {
    hasError: boolean,
}

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // this method is used to trigger state and show a reserved UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // this method can save error and its info to some journal
  }

  retry = () => {
    window.location.reload();
    this.setState({
      hasError: false,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.withRetry}>
          <img
            className={styles.withRetry_img}
            src={iceCream}
            alt="Something went wrong"
          />
          <h1 className={styles.withRetry_title}>
            Something went wrong
          </h1>
          <h2 className={styles.withRetry_subtitle}>
            Try again
          </h2>
          <button
            className="withRetry_button"
            onClick={this.retry}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;