import { Topic } from '../../models/section';

export const eventsObserversTopic: Topic = {
  id: 'advanced-events-observers',
  name: 'Events & Observers',
  sectionId: 'advanced',
  slug: 'events-observers',
  explanation: `
    <h3>Events and Observer Pattern in C#</h3>
    <p>Events provide a way for objects to notify other objects when something interesting happens. The Observer pattern defines a one-to-many relationship between objects, where changes to one object trigger updates in dependent objects.</p>

    <h4>Event Fundamentals</h4>
    <ul>
      <li><strong>Publisher:</strong> The object that raises events</li>
      <li><strong>Subscriber:</strong> The object that handles events</li>
      <li><strong>Event Handler:</strong> The method that responds to events</li>
      <li><strong>Event Args:</strong> Data passed with the event</li>
    </ul>

    <h4>Observer Pattern Components</h4>
    <ul>
      <li><strong>Subject:</strong> The object being observed (Observable)</li>
      <li><strong>Observer:</strong> The object that watches the subject</li>
      <li><strong>Concrete Subject:</strong> Implements the subject interface</li>
      <li><strong>Concrete Observer:</strong> Implements the observer interface</li>
    </ul>

    <h4>Advanced Event Features</h4>
    <ul>
      <li><strong>Weak Events:</strong> Prevent memory leaks in long-lived publishers</li>
      <li><strong>Event Aggregator:</strong> Centralized event management</li>
      <li><strong>Reactive Extensions:</strong> LINQ for events</li>
      <li><strong>Async Events:</strong> Asynchronous event handling</li>
    </ul>

    <h4>Best Practices</h4>
    <ul>
      <li>Use EventHandler&lt;TEventArgs&gt; delegate for type safety</li>
      <li>Make events private and provide add/remove methods</li>
      <li>Use protected virtual OnEvent methods for extensibility</li>
      <li>Check for null before raising events</li>
      <li>Consider thread safety for cross-thread events</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

// Basic Event Example
public class Button {
    // Event declaration using EventHandler<T>
    public event EventHandler<ButtonClickEventArgs> Click;

    public string Text { get; set; }

    public void SimulateClick() {
        Console.WriteLine($"Button '{Text}' was clicked");
        OnClick(new ButtonClickEventArgs(DateTime.Now));
    }

    protected virtual void OnClick(ButtonClickEventArgs e) {
        Click?.Invoke(this, e);
    }
}

public class ButtonClickEventArgs : EventArgs {
    public DateTime ClickTime { get; }

    public ButtonClickEventArgs(DateTime clickTime) {
        ClickTime = clickTime;
    }
}

public class ButtonClickLogger {
    public void Subscribe(Button button) {
        button.Click += Button_Click;
    }

    public void Unsubscribe(Button button) {
        button.Click -= Button_Click;
    }

    private void Button_Click(object sender, ButtonClickEventArgs e) {
        var button = (Button)sender;
        Console.WriteLine($"[LOG] Button '{button.Text}' clicked at {e.ClickTime:T}");
    }
}

// Observer Pattern Implementation
public interface IObserver<T> {
    void OnNext(T value);
    void OnError(Exception error);
    void OnCompleted();
}

public interface IObservable<T> {
    IDisposable Subscribe(IObserver<T> observer);
}

public class WeatherStation : IObservable<WeatherData> {
    private readonly List<IObserver<WeatherData>> _observers = new List<IObserver<WeatherData>>();

    public IDisposable Subscribe(IObserver<WeatherData> observer) {
        if (!_observers.Contains(observer)) {
            _observers.Add(observer);
        }

        return new Unsubscriber<WeatherData>(_observers, observer);
    }

    public void SetMeasurements(float temperature, float humidity, float pressure) {
        var data = new WeatherData(temperature, humidity, pressure);
        foreach (var observer in _observers) {
            observer.OnNext(data);
        }
    }

    public void EndTransmission() {
        foreach (var observer in _observers) {
            observer.OnCompleted();
        }
        _observers.Clear();
    }
}

public class WeatherData {
    public float Temperature { get; }
    public float Humidity { get; }
    public float Pressure { get; }

    public WeatherData(float temperature, float humidity, float pressure) {
        Temperature = temperature;
        Humidity = humidity;
        Pressure = pressure;
    }

    public override string ToString() {
        return $"T: {Temperature}°C, H: {Humidity}%, P: {Pressure}hPa";
    }
}

public class CurrentConditionsDisplay : IObserver<WeatherData> {
    private IDisposable _unsubscriber;
    private WeatherData _currentData;

    public virtual void Subscribe(IObservable<WeatherData> provider) {
        _unsubscriber = provider.Subscribe(this);
    }

    public virtual void Unsubscribe() {
        _unsubscriber?.Dispose();
    }

    public void OnNext(WeatherData value) {
        _currentData = value;
        Console.WriteLine($"Current conditions: {_currentData}");
    }

    public void OnError(Exception error) {
        Console.WriteLine($"Error: {error.Message}");
    }

    public void OnCompleted() {
        Console.WriteLine("Weather station has completed transmitting data.");
    }
}

public class StatisticsDisplay : IObserver<WeatherData> {
    private IDisposable _unsubscriber;
    private readonly List<float> _temperatures = new List<float>();

    public virtual void Subscribe(IObservable<WeatherData> provider) {
        _unsubscriber = provider.Subscribe(this);
    }

    public virtual void Unsubscribe() {
        _unsubscriber?.Dispose();
    }

    public void OnNext(WeatherData value) {
        _temperatures.Add(value.Temperature);
        Console.WriteLine($"Statistics - Avg temp: {_temperatures.Average():F1}°C, Max temp: {_temperatures.Max()}°C");
    }

    public void OnError(Exception error) {
        Console.WriteLine($"Statistics error: {error.Message}");
    }

    public void OnCompleted() {
        Console.WriteLine("Statistics display completed.");
    }
}

public class Unsubscriber<T> : IDisposable {
    private readonly List<IObserver<T>> _observers;
    private readonly IObserver<T> _observer;

    public Unsubscriber(List<IObserver<T>> observers, IObserver<T> observer) {
        _observers = observers;
        _observer = observer;
    }

    public void Dispose() {
        if (_observer != null && _observers.Contains(_observer)) {
            _observers.Remove(_observer);
        }
    }
}

// Event Aggregator Pattern
public interface IEventAggregator {
    void Publish<TEvent>(TEvent eventToPublish);
    ISubscription Subscribe<TEvent>(Action<TEvent> action);
}

public interface ISubscription : IDisposable { }

public class EventAggregator : IEventAggregator {
    private readonly Dictionary<Type, List<object>> _eventHandlers = new Dictionary<Type, List<object>>();

    public void Publish<TEvent>(TEvent eventToPublish) {
        var eventType = typeof(TEvent);
        if (_eventHandlers.TryGetValue(eventType, out var handlers)) {
            foreach (var handler in handlers.Cast<Action<TEvent>>()) {
                handler(eventToPublish);
            }
        }
    }

    public ISubscription Subscribe<TEvent>(Action<TEvent> action) {
        var eventType = typeof(TEvent);
        if (!_eventHandlers.ContainsKey(eventType)) {
            _eventHandlers[eventType] = new List<object>();
        }

        _eventHandlers[eventType].Add(action);
        return new Subscription<TEvent>(_eventHandlers[eventType], action);
    }
}

public class Subscription<TEvent> : ISubscription {
    private readonly List<object> _handlers;
    private readonly Action<TEvent> _action;

    public Subscription(List<object> handlers, Action<TEvent> action) {
        _handlers = handlers;
        _action = action;
    }

    public void Dispose() {
        _handlers.Remove(_action);
    }
}

// Domain Events
public abstract class DomainEvent {
    public DateTime OccurredOn { get; } = DateTime.Now;
    public Guid EventId { get; } = Guid.NewGuid();
}

public class OrderPlacedEvent : DomainEvent {
    public Guid OrderId { get; }
    public string CustomerEmail { get; }
    public decimal TotalAmount { get; }

    public OrderPlacedEvent(Guid orderId, string customerEmail, decimal totalAmount) {
        OrderId = orderId;
        CustomerEmail = customerEmail;
        TotalAmount = totalAmount;
    }
}

public class OrderShippedEvent : DomainEvent {
    public Guid OrderId { get; }

    public OrderShippedEvent(Guid orderId) {
        OrderId = orderId;
    }
}

public interface IDomainEventHandler<TEvent> where TEvent : DomainEvent {
    Task HandleAsync(TEvent domainEvent);
}

public class EmailService {
    public async Task SendOrderConfirmationAsync(Guid orderId, string customerEmail, decimal totalAmount) {
        await Task.Delay(100); // Simulate email sending
        Console.WriteLine("Email sent to " + customerEmail + ": Order " + orderId + " confirmed for $" + totalAmount);
    }

    public async Task SendShippingNotificationAsync(Guid orderId, string customerEmail) {
        await Task.Delay(100); // Simulate email sending
        Console.WriteLine($"Email sent to {customerEmail}: Order {orderId} has been shipped");
    }
}

public class OrderConfirmationHandler : IDomainEventHandler<OrderPlacedEvent> {
    private readonly EmailService _emailService;

    public OrderConfirmationHandler(EmailService emailService) {
        _emailService = emailService;
    }

    public async Task HandleAsync(OrderPlacedEvent domainEvent) {
        await _emailService.SendOrderConfirmationAsync(
            domainEvent.OrderId,
            domainEvent.CustomerEmail,
            domainEvent.TotalAmount);
    }
}

public class InventoryUpdateHandler : IDomainEventHandler<OrderPlacedEvent> {
    public async Task HandleAsync(OrderPlacedEvent domainEvent) {
        await Task.Delay(50); // Simulate inventory update
        Console.WriteLine($"Inventory updated for order {domainEvent.OrderId}");
    }
}

public class ShippingNotificationHandler : IDomainEventHandler<OrderShippedEvent> {
    private readonly EmailService _emailService;

    public ShippingNotificationHandler(EmailService emailService) {
        _emailService = emailService;
    }

    public async Task HandleAsync(OrderShippedEvent domainEvent) {
        // In a real app, you'd look up the customer email from the order
        await _emailService.SendShippingNotificationAsync(domainEvent.OrderId, "customer@example.com");
    }
}

public class DomainEventDispatcher {
    private readonly Dictionary<Type, List<object>> _handlers = new Dictionary<Type, List<object>>();

    public void Register<TEvent>(IDomainEventHandler<TEvent> handler) where TEvent : DomainEvent {
        var eventType = typeof(TEvent);
        if (!_handlers.ContainsKey(eventType)) {
            _handlers[eventType] = new List<object>();
        }
        _handlers[eventType].Add(handler);
    }

    public async Task DispatchAsync<TEvent>(TEvent domainEvent) where TEvent : DomainEvent {
        var eventType = typeof(TEvent);
        if (_handlers.TryGetValue(eventType, out var handlers)) {
            var tasks = handlers.Cast<IDomainEventHandler<TEvent>>()
                               .Select(handler => handler.HandleAsync(domainEvent));
            await Task.WhenAll(tasks);
        }
    }
}

// Weak Events (preventing memory leaks)
public class WeakEventManager {
    private readonly Dictionary<string, List<WeakReference>> _eventHandlers =
        new Dictionary<string, List<WeakReference>>();

    public void AddEventHandler(string eventName, EventHandler handler) {
        if (!_eventHandlers.ContainsKey(eventName)) {
            _eventHandlers[eventName] = new List<WeakReference>();
        }

        _eventHandlers[eventName].Add(new WeakReference(handler));
    }

    public void RemoveEventHandler(string eventName, EventHandler handler) {
        if (_eventHandlers.TryGetValue(eventName, out var handlers)) {
            handlers.RemoveAll(wr => wr.Target == null || wr.Target == handler);
        }
    }

    public void RaiseEvent(string eventName, object sender, EventArgs e) {
        if (_eventHandlers.TryGetValue(eventName, out var handlers)) {
            // Clean up dead references and invoke live ones
            handlers.RemoveAll(wr => wr.Target == null);

            foreach (var weakRef in handlers.ToList()) {
                if (weakRef.Target is EventHandler handler) {
                    handler(sender, e);
                }
            }
        }
    }
}

// Reactive Extensions Style Observable
public static class ObservableExtensions {
    public static IObservable<TResult> Select<TSource, TResult>(
        this IObservable<TSource> source,
        Func<TSource, TResult> selector) {
        return new SelectObservable<TSource, TResult>(source, selector);
    }

    public static IObservable<TSource> Where<TSource>(
        this IObservable<TSource> source,
        Func<TSource, bool> predicate) {
        return new WhereObservable<TSource>(source, predicate);
    }

    public static IDisposable Subscribe<TSource>(
        this IObservable<TSource> source,
        Action<TSource> onNext,
        Action<Exception> onError = null,
        Action onCompleted = null) {
        return source.Subscribe(new AnonymousObserver<TSource>(onNext, onError, onCompleted));
    }
}

public class SelectObservable<TSource, TResult> : IObservable<TResult> {
    private readonly IObservable<TSource> _source;
    private readonly Func<TSource, TResult> _selector;

    public SelectObservable(IObservable<TSource> source, Func<TSource, TResult> selector) {
        _source = source;
        _selector = selector;
    }

    public IDisposable Subscribe(IObserver<TResult> observer) {
        return _source.Subscribe(new SelectObserver<TSource, TResult>(observer, _selector));
    }
}

public class WhereObservable<TSource> : IObservable<TSource> {
    private readonly IObservable<TSource> _source;
    private readonly Func<TSource, bool> _predicate;

    public WhereObservable(IObservable<TSource> source, Func<TSource, bool> predicate) {
        _source = source;
        _predicate = predicate;
    }

    public IDisposable Subscribe(IObserver<TSource> observer) {
        return _source.Subscribe(new WhereObserver<TSource>(observer, _predicate));
    }
}

public class SelectObserver<TSource, TResult> : IObserver<TSource> {
    private readonly IObserver<TResult> _observer;
    private readonly Func<TSource, TResult> _selector;

    public SelectObserver(IObserver<TResult> observer, Func<TSource, TResult> selector) {
        _observer = observer;
        _selector = selector;
    }

    public void OnNext(TSource value) {
        try {
            var result = _selector(value);
            _observer.OnNext(result);
        } catch (Exception ex) {
            _observer.OnError(ex);
        }
    }

    public void OnError(Exception error) => _observer.OnError(error);
    public void OnCompleted() => _observer.OnCompleted();
}

public class WhereObserver<TSource> : IObserver<TSource> {
    private readonly IObserver<TSource> _observer;
    private readonly Func<TSource, bool> _predicate;

    public WhereObserver(IObserver<TSource> observer, Func<TSource, bool> predicate) {
        _observer = observer;
        _predicate = predicate;
    }

    public void OnNext(TSource value) {
        if (_predicate(value)) {
            _observer.OnNext(value);
        }
    }

    public void OnError(Exception error) => _observer.OnError(error);
    public void OnCompleted() => _observer.OnCompleted();
}

public class AnonymousObserver<T> : IObserver<T> {
    private readonly Action<T> _onNext;
    private readonly Action<Exception> _onError;
    private readonly Action _onCompleted;

    public AnonymousObserver(Action<T> onNext, Action<Exception> onError = null, Action onCompleted = null) {
        _onNext = onNext;
        _onError = onError ?? (_ => { });
        _onCompleted = onCompleted ?? (() => { });
    }

    public void OnNext(T value) => _onNext(value);
    public void OnError(Exception error) => _onError(error);
    public void OnCompleted() => _onCompleted();
}

// Demonstration
public void DemonstrateEventsAndObservers() {
    // Basic Events
    Console.WriteLine("=== Basic Events ===");
    var button = new Button { Text = "Submit" };
    var logger = new ButtonClickLogger();
    logger.Subscribe(button);

    button.SimulateClick();
    button.SimulateClick();

    logger.Unsubscribe(button);
    button.SimulateClick(); // No logging after unsubscribe

    // Observer Pattern
    Console.WriteLine("\\n=== Observer Pattern ===");
    var weatherStation = new WeatherStation();
    var currentDisplay = new CurrentConditionsDisplay();
    var statisticsDisplay = new StatisticsDisplay();

    currentDisplay.Subscribe(weatherStation);
    statisticsDisplay.Subscribe(weatherStation);

    weatherStation.SetMeasurements(25.5f, 65.0f, 1013.2f);
    weatherStation.SetMeasurements(26.2f, 63.5f, 1012.8f);
    weatherStation.SetMeasurements(24.8f, 67.2f, 1014.1f);

    currentDisplay.Unsubscribe();
    weatherStation.SetMeasurements(23.5f, 70.0f, 1015.5f);

    weatherStation.EndTransmission();

    // Event Aggregator
    Console.WriteLine("\\n=== Event Aggregator ===");
    var eventAggregator = new EventAggregator();

    var subscription1 = eventAggregator.Subscribe<string>(message =>
        Console.WriteLine($"Subscriber 1: {message}"));

    var subscription2 = eventAggregator.Subscribe<string>(message =>
        Console.WriteLine($"Subscriber 2: {message}"));

    eventAggregator.Publish("Hello from Event Aggregator!");
    eventAggregator.Publish("Another message");

    subscription1.Dispose();
    eventAggregator.Publish("Only subscriber 2 should see this");

    // Domain Events
    Console.WriteLine("\\n=== Domain Events ===");
    var eventDispatcher = new DomainEventDispatcher();
    var emailService = new EmailService();

    eventDispatcher.Register(new OrderConfirmationHandler(emailService));
    eventDispatcher.Register(new InventoryUpdateHandler(emailService));
    eventDispatcher.Register(new ShippingNotificationHandler(emailService));

    var orderPlacedEvent = new OrderPlacedEvent(
        Guid.NewGuid(),
        "customer@example.com",
        99.99m);

    var orderShippedEvent = new OrderShippedEvent(orderPlacedEvent.OrderId);

    eventDispatcher.DispatchAsync(orderPlacedEvent).Wait();
    eventDispatcher.DispatchAsync(orderShippedEvent).Wait();

    // Reactive Extensions Style
    Console.WriteLine("\\n=== Reactive Extensions Style ===");
    var numbers = new NumberObservable();

    var subscription = numbers
        .Where(n => n % 2 == 0)
        .Select(n => n * n)
        .Subscribe(
            value => Console.WriteLine($"Even number squared: {value}"),
            error => Console.WriteLine($"Error: {error.Message}"),
            () => Console.WriteLine("Sequence completed")
        );

    numbers.PublishNext(1);
    numbers.PublishNext(2);
    numbers.PublishNext(3);
    numbers.PublishNext(4);
    numbers.PublishCompleted();

    subscription.Dispose();
}

// Helper class for reactive demo
public class NumberObservable : IObservable<int> {
    private readonly List<IObserver<int>> _observers = new List<IObserver<int>>();

    public IDisposable Subscribe(IObserver<int> observer) {
        _observers.Add(observer);
        return new Unsubscriber<int>(_observers, observer);
    }

    public void PublishNext(int value) {
        foreach (var observer in _observers) {
            observer.OnNext(value);
        }
    }

    public void PublishCompleted() {
        foreach (var observer in _observers) {
            observer.OnCompleted();
        }
    }
}`,
  keyPoints: [
    'Events provide loose coupling between objects',
    'Observer pattern enables one-to-many relationships',
    'Use EventHandler<T> for type-safe event signatures',
    'Domain events separate business logic from infrastructure',
    'Event aggregator centralizes event management',
    'Weak events prevent memory leaks in long-lived objects',
    'Reactive extensions bring LINQ-style operations to events',
    'Always check for null before raising events',
  ],
  exercise:
    'Implement a comprehensive event-driven order processing system using domain events. Create a reactive stock price monitoring system that alerts subscribers when prices cross thresholds. Build an event aggregator that supports async event handlers and event filtering. Implement weak events to prevent memory leaks in a long-running UI application.',
};
