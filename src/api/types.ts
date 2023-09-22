import { RefetchFnDynamic } from "react-relay";
import { Options } from "react-relay/relay-hooks/useRefetchableFragmentNode";
import { OperationType } from "relay-runtime";

export interface IMResponse {
  anchor: number,
  code: string | null, //STREAM_DOES_NOT_EXIST | BAD_REQUEST | null
  found_anchor: boolean,
  found_newest: boolean,
  found_oldest: boolean,
  history_limited: boolean,
  id: number | null,
  messages: message[],
  msg: 'success' | 'error',
  result: string
  stream: string | null
}

export class IMError extends Error {
  readonly IMResponse: IMResponse;
  readonly name: string;
  readonly stack: string | undefined;
  constructor(IMResponse: IMResponse) {
    super(IMResponse?.msg); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = 'IMError';
    this.stack = (new Error()).stack;
    this.IMResponse = IMResponse;
  }
}

export interface ZulipJSClient {
  accounts: {
    retrieve: Function
  };
  callEndpoint: Function;
  callOnEachEvent: Function;
  config: {
    apiKey: string,
    apiURL: string,
    realm: string,
    username: string,
  };
  emojis: {
    retrieve: Function,
  };
  events: {
    retrieve: Function,
  };
  filters: {
    retrieve: Function,
  };
  messages: {
    deleteById: Function,
    deleteReactionById: Function,
    flags: {
      add: Function,
      remove: Function,
    },
    getById: Function,
    getHistoryByid: Function,
    render: Function,
    retrieve: Function,
    send: Function,
    update: Function,
  };
  queues: {
    deregister: Function,
    register: Function,
  };
  reactions: {
    add: Function,
    remove: Function,
  };
  server: {
    settings: Function,
  };
  streams: {
    deleteById: Function,
    getStreamId: Function,
    retrieve: Function,
    subscriptions: {
      retrieve: Function,
    },
    topics: {
      retrieve: Function,
    },
  };
  typing: {
    send: Function,
  };
  users: {
    create: Function,
    me: {
      alertWords: { retrieve: Function },
      getProfile: Function,
      pointer: {
        retrieve: Function,
        update: Function,
      },
      subscriptions: {
        add: Function,
        remove: Function,
      }
    },
    retrieve: Function
  }
}

export interface Subscription {
  subscriptions: [{
    name: string;
    description: string;
  }],
  principals: string[],
  invite_only?: boolean,
  history_public_to_subscribers?: boolean
}

export interface reaction_event {
  type: 'reaction'
  op: string
  user_id: number
  user: user
  message_id: number
  emoji_name: string
  emoji_code: string
  reaction_type: string
  id: number
}

export interface message_event {
  type: 'message'
  message: message
  flags: any[]
  id: number
}

export interface update_message_flags_event {
  type: 'update_message_flags'
  op: string
  operation: string
  flag: string
  messages: number[]
  all: boolean
  id: number
}

export interface message {
  id: number
  sender_id: number
  content: string
  recipient_id: number
  timestamp: number
  client: string
  subject: string
  topic_links: any[]
  is_me_message: boolean
  reactions: any[]
  submessages: any[]
  flags: any[]
  sender_full_name: string
  sender_email: string
  sender_realm_str: string
  display_recipient: string
  type: string
  stream_id: number
  avatar_url: any
  content_type: string
}

export interface user {
  user_id: number
  email: string
  full_name: string
}

export interface stream {
  __id: string //base64 encoded array where the last element is stream_guid [1, "base", "stream", "dda41b61-5558-4d2d-aae6-c383fcc9c297"]
  stream_guid: string
  vacancy_id: number
  owned_by: number
  last_message: string
  created_at: Date
  modified_by: number | null
  modified_at: Date
}

export interface StreamItem {
  stream_guid?: string
  vacancy_id: number
  vacancy__id: string // relay generated identifier
  pendingSend?: boolean
  pendingSave?: string
  refetch: RefetchFnDynamic<OperationType, any, Options>
}
