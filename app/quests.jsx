var Dashboard = React.createClass({
  loadUserData: function() {

    var filePath = this.props.url;
    d3.json(filePath, function(error, json) {
      if(error) return console.warn("failed to load tagfilter:  "+error);
      this.setState({
        username: json.user.username,
        userFullName: json.user.name,
        userBio: json.user.bio,
        userPicUrl: json.user.picUrl,
        binders: json.binders,
        tags: json.tags,
        // CORS-enabled server.
        bookmarksUrl: "https://spreadsheets.google.com/tq?key=" + json.bookmarks.key + json.bookmarks.query
      });
      router(); /* from //app/router.js */
      this.loadBookmarksFromServer();
    }.bind(this));
  },
  loadBookmarksFromServer: function() {
    d3.csv(this.state.bookmarksUrl, function(error, data) {
      if(error) {
        console.log("ERROR IN D3 CSV LOADING")
        this.setState({
          bookmarksData: error
        });
      } else {
        this.setState({
          bookmarksData: data
        });
        this.renderDataVis();
      }
    }.bind(this))
  },
  renderDataVis: function() {
    ReactDOM.render(<BookmarksList username={this.state.userFullName} data={this.state.bookmarksData}/>, document.getElementById('notebooks'));
    ReactDOM.render(<Pie divId="pie" data={this.state.bookmarksData}/>, document.getElementById('pie'));
    ReactDOM.render(<Matrix divId="matrix" data={this.state.bookmarksData}/>, document.getElementById('matrix'));
  },
  componentDidMount: function() {
    this.loadUserData();
  },
  getInitialState: function() {
    return {
      username: "",
      userFullName: "",
      userPicUrl: "",
      userBio: "",
      binders: [],
      tags: [],
      bookmarksUrl: "google.com",
      bookmarksData: []
    }
  },
  render: function() {
    var mdUrl = "/assets/data/profile/md/"+dashboard.user.username+".md";
    return (
      <div>
        <StickyTopNav profileName={this.state.userFullName} picUrl={this.state.userPicUrl}/>

        <div className="main-content row page-wrap">
          <div id="notebooks-page" className="pages">
            <div id="notebooks"></div>
          </div>
          <div id="matrix-page" className="pages">
            <div id="matrix"></div>
          </div>
          <div id="pie-page" className="pages">
            <div id="pie"></div>
          </div>
          <div id="about-page" className="pages">
            <About mdUrl={mdUrl} bio={this.state.userBio} picUrl={this.state.userPicUrl} name={this.state.userFullName}/>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Dashboard url={"assets/data/profile/"+dashboard.user.username+".json"} />,
  document.getElementById('dashboard')
);
