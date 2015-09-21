import React from "react";

import "components/Table.scss";

export default class DisplayTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <table className="table">
              <thead>
                <tr>
                {
                    this.props.headings.map( heading => <th>{heading}</th> )
                }
                </tr>
              </thead>
              <tbody>
                {
                  this.props.rows.map( row => {
                    return (
                      <tr>
                        {
                          row.map( col => <td>{col}</td>)
                        }
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
        );
    }
}
