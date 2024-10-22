export const idlFactory = ({ IDL }) => {
  const Article = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'author' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  const Result = IDL.Variant({ 'ok' : Article, 'err' : IDL.Text });
  return IDL.Service({
    'addArticle' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Nat], []),
    'getArticle' : IDL.Func([IDL.Nat], [Result], ['query']),
    'listArticles' : IDL.Func([], [IDL.Vec(Article)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
