package com.opentokreactnative

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.OTNativeSubscriberViewManagerInterface;
import com.facebook.react.viewmanagers.OTNativeSubscriberViewManagerDelegate;

@ReactModule(name = OTSubscriberViewManager.REACT_CLASS)
class OTSubscriberViewManager(context: ReactApplicationContext) : SimpleViewManager<OTSubscriberView>(), OTNativeSubscriberViewManagerInterface<OTSubscriberView> {
  private val delegate: OTNativeSubscriberViewManagerDelegate<OTSubscriberView, OTSubscriberViewManager> =
    OTNativeSubscriberViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<OTSubscriberView> = delegate

  override fun getName(): String = REACT_CLASS

  override fun createViewInstance(context: ThemedReactContext): OTSubscriberView = OTSubscriberView(context)

  @ReactProp(name = "streamId")
  override public fun setStreamId(view: OTSubscriberView, streamId: String?) {
    view.setStreamId(streamId)
  }

  @ReactProp(name = "sessionId")
  override public fun setSessionId(view: OTSubscriberView, sessionId: String?) {
    view.setSessionId(sessionId)
  }


  @ReactProp(name = "subscribeToVideo")
  override public fun setSubscribeToVideo(view: OTSubscriberView, value: Boolean) {
    view.setSubscribeToVideo(value)
  }

  companion object {
    const val REACT_CLASS = "OTNativeSubscriberView"
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