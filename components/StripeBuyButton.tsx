import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-buy-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                'buy-button-id': string;
                'publishable-key': string;
            };
        }
    }
}

export const StripeBuyButton: React.FC = () => {
    return (
        <stripe-buy-button
            buy-button-id="buy_btn_1SY5bw4wz9bVckTDhOEjLKEu"
            publishable-key="pk_live_51SXLxP4wz9bVckTDE7V8D1aJnClOv8D2iwih0Vdbv5SdslTZlizjrpCK9JFUd5FY2AmxIlmqufG0xKQXz9df8KaJ00QY0AOFIW"
        >
        </stripe-buy-button>
    );
};
