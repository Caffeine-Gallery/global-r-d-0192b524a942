import Func "mo:base/Func";

import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor {
  // Define the structure for a news article
  type Article = {
    id: Nat;
    title: Text;
    content: Text;
    author: Text;
    timestamp: Int;
  };

  // Stable variable to store articles
  stable var articles : [Article] = [];
  stable var nextId : Nat = 0;

  // Function to add a new article
  public func addArticle(title: Text, content: Text, author: Text) : async Nat {
    let id = nextId;
    let timestamp = Time.now();
    let article : Article = {
      id;
      title;
      content;
      author;
      timestamp;
    };
    articles := Array.append(articles, [article]);
    nextId += 1;
    id
  };

  // Function to get an article by id
  public query func getArticle(id: Nat) : async Result.Result<Article, Text> {
    let article = Array.find<Article>(articles, func(a) { a.id == id });
    switch (article) {
      case (null) { #err("Article not found") };
      case (?a) { #ok(a) };
    };
  };

  // Function to list all articles
  public query func listArticles() : async [Article] {
    Array.reverse(articles)
  };

  // System functions for upgrade resilience
  system func preupgrade() {
    Debug.print("Preparing to upgrade...");
  };

  system func postupgrade() {
    Debug.print("Upgrade complete!");
  };
}
