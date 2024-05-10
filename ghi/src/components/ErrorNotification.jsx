
export default function ErrorNotification(props) {
    if (!props.error) {
        return null
    }
    return <div className="notification is-danger">{props.error}</div>
}


