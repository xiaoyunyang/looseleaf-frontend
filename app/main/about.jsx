var About = React.createClass({

  componentDidMount: function() {
    $('.materialboxed').materialbox();
    $('.slider').slider({full_width: true});
  },
  render: function() {
    return (
      <div>
        <div className="col s12 m8 l12">
          <div className="row hero">
            <div className="col s6 m4 l2">
              <img className="rounded" src={this.props.picUrl}/>
            </div>
            <div className="col s12 m6 l10">
              <h4>{this.props.name}</h4>
              <h5>{this.props.bio}</h5>
            </div>
          </div>
          <div className="row container">
            <MdText url={this.props.mdUrl} textId="text-about" />
          </div>
        </div>
      </div>
    );
  }
});
