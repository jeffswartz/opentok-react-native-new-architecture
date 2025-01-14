package com.opentokreactnative

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.SubscriberViewManagerInterface;
import com.facebook.react.viewmanagers.SubscriberViewManagerDelegate;

@ReactModule(name = SubscriberViewManager.REACT_CLASS)
class SubscriberViewManager(context: ReactApplicationContext) : SimpleViewManager<SubscriberView>(), SubscriberViewManagerInterface<SubscriberView> {
  private val delegate: SubscriberViewManagerDelegate<SubscriberView, SubscriberViewManager> =
    SubscriberViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<SubscriberView> = delegate

  override fun getName(): String = REACT_CLASS

  override fun createViewInstance(context: ThemedReactContext): SubscriberView = SubscriberView(context)

  @ReactProp(name = "streamId")
  override public fun setStreamId(view: SubscriberView, streamId: String?) {
    view.setStreamId(streamId)
  }

  @ReactProp(name = "sessionId")
  override public fun setSessionId(view: SubscriberView, sessionId: String?) {
    view.setSessionId(sessionId)
  }

  companion object {
    const val REACT_CLASS = "SubscriberView"
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> =
      mapOf(
          "onSubscriberConnected" to
              mapOf(
                  "phasedRegistrationNames" to
                      mapOf(
                          "bubbled" to "onSubscriberConnected",
                          "captured" to "onSubscriberConnectedCapture"
                      )))
}