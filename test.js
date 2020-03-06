<!DOCTYPE html>
<html>
  <body>
    <script src="https://unpkg.com/react@16.3.2/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16.3.2/umd/react-dom.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js" charset="utf-8"></script>
    <script type="text/babel">
      function Greeter(props) {
        return <div>Hello {/* Write your code here */}</div>;
      }

      class App extends React.Component {
        render() {
          return (<Greeter user="Admin" />);
        }
      }
      
      const rootElement = document.getElementById("root");
      ReactDOM.render(<App />, rootElement);
    </script>
    <div id="root"></div>
  </body>
</html>