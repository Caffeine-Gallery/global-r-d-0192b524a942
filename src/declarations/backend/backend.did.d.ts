import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Article {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'author' : string,
  'timestamp' : bigint,
}
export type Result = { 'ok' : Article } |
  { 'err' : string };
export interface _SERVICE {
  'addArticle' : ActorMethod<[string, string, string], bigint>,
  'getArticle' : ActorMethod<[bigint], Result>,
  'listArticles' : ActorMethod<[], Array<Article>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
