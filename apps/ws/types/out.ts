export type DepthUpdateMessage = {
  type: "depth";
  data: {
    YES: {
      asks: any[];
      bids: any[];
    };
    NO: {
      asks: any[];
      bids: any[];
    };
  };
};

export type OutgoingMessage = DepthUpdateMessage;
