import MaterialTable from "material-table";
import 'bootstrap/dist/css/bootstrap.min.css';

class BasicTable extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        fetch('/v1/users')
                .then(response => response.json())
                .then(data => this.setState({data: data}))
                .catch(error => alert(error));
    }

    render() {
        return (
                <MaterialTable
                    columns={[
                                {title: 'Name', field: 'name'},
                                {title: 'Website', field: 'shortURL'},
                                {title: 'Friends', field: 'friends'}
                            ]}
                    data = {this.state.data}
                    title='Users'
                    />
                );
    }
}
export default BasicTable;