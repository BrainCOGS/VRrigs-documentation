<template><div><h1 id="frontmatter-title" tabindex="-1"><a class="header-anchor" href="#frontmatter-title"><span>{{ $frontmatter.title }}</span></a></h1>
<h2 id="set-up-custom-slack-alerts" tabindex="-1"><a class="header-anchor" href="#set-up-custom-slack-alerts"><span>Set up custom slack alerts</span></a></h2>
<ol>
<li>Follow  <a href="https://braincogs.github.io/software/db_access.html#db-access-for-python-repository">Database Access with Python instructions</a></li>
<li>On U19_pipeline_python repository open <code v-pre>u19_pipeline/alert_system/custom_alerts directory</code></li>
<li>Create a new python file with a meaningful name for the alert: (e.g. <code v-pre>subject_bias.py</code>)</li>
<li>Copy skeleton code from <code v-pre>u19_pipeline/alert_system/alert_code_skeleton.py</code></li>
</ol>
<ul>
<li>All slack alert code has two parts: <strong>a slack channel configuration</strong> and a <strong>main function</strong> described on the next section:</li>
</ul>
<h3 id="main-function-guide" tabindex="-1"><a class="header-anchor" href="#main-function-guide"><span>main function guide</span></a></h3>
<ul>
<li>This function should return a pandas DataFrame where each row will be a slack alert message on configured channels.</li>
<li>You can use datajoint to get data for the alert (e.g. custom_alerts/rig_bias.py) or simply call os scripts (e.g. custom_alerts/braininit_storage.py)</li>
<li>All columns of the dataframe will be included in the alert. (Don't add too many !!)</li>
<li>Dataframe Example with slack notification message:</li>
</ul>
  <figure>
  <img src='@source/software/assets/images/alert_system/Alert_dataframe_example.png'>
  <center><figcaption>Example Dataframe for notification </figcaption></center>
 </figure>
 <figure>
  <img src='@source/software/assets/images/alert_system/Alert_message_example.png'>
  <center><figcaption>Example Notification from previous DataFrame</figcaption></center>
 </figure>
<ul>
<li>You can check examples of some alers in the u19_pipeline/alert_system/custom_alerts directory</li>
</ul>
<h3 id="slack-channel-dictionary-configuration" tabindex="-1"><a class="header-anchor" href="#slack-channel-dictionary-configuration"><span>Slack channel dictionary configuration</span></a></h3>
<ul>
<li>
<p>The slack channel configuration is a dictionary to link corresponding slack channels and conversations with an specific alert.</p>
</li>
<li>
<p>The dictionary has two keys: <code v-pre>'slack_notification_channel'</code> and <code v-pre>'slack_users_channel'</code></p>
</li>
<li>
<p><strong>slack_notification_channel</strong> General channels names to send notifications.</p>
</li>
<li>
<p><strong>slack_users_channel</strong> Private direct message to send notificatons.</p>
</li>
<li>
<p>You can add a list of channels to each of the keys:</p>
</li>
<li>
<p><strong>slack_notification_channel</strong> Any <code v-pre>webhook_name</code> (see next section)</p>
</li>
<li>
<p><strong>slack_users_channel</strong> Any user_id with configured slack_weebhook (see next section)</p>
</li>
</ul>
<h4 id="check-available-notification-channels" tabindex="-1"><a class="header-anchor" href="#check-available-notification-channels"><span>Check available notification channels:</span></a></h4>
<h5 id="matlab" tabindex="-1"><a class="header-anchor" href="#matlab"><span>MATLAB</span></a></h5>
<ol>
<li>Execute <code v-pre>fetch(lab.SlackWebhooks,'*')</code></li>
</ol>
<h5 id="python" tabindex="-1"><a class="header-anchor" href="#python"><span>Python</span></a></h5>
<ol>
<li>Execute:</li>
</ol>
<ul>
<li><code v-pre>lab = dj.create_virtual_module('lab', 'u19_lab')</code></li>
<li><code v-pre>lab.SlackWebhooks.fetch(as_dict=True)</code></li>
</ul>
<h4 id="check-available-user-channels" tabindex="-1"><a class="header-anchor" href="#check-available-user-channels"><span>Check available user channels:</span></a></h4>
<h5 id="matlab-1" tabindex="-1"><a class="header-anchor" href="#matlab-1"><span>MATLAB</span></a></h5>
<ol>
<li>Execute <code v-pre>fetch(lab.User &amp; &quot;slack_webhook &lt;&gt; ''&quot;,'slack_webhook')</code></li>
</ol>
<h5 id="python-1" tabindex="-1"><a class="header-anchor" href="#python-1"><span>Python</span></a></h5>
<ol>
<li>Execute:</li>
</ol>
<ul>
<li><code v-pre>lab = dj.create_virtual_module('lab', 'u19_lab')</code></li>
<li><code v-pre>(lab.User &amp; &quot;slack_webhook &lt;&gt; ''&quot;).fetch('KEY', 'slack_webhook', as_dict=True)</code></li>
</ul>
<h3 id="create-and-register-new-webhooks-for-alerts" tabindex="-1"><a class="header-anchor" href="#create-and-register-new-webhooks-for-alerts"><span>Create and register new webhooks for alerts:</span></a></h3>
<ol>
<li>Create a new slack channel if needed (for notification channels).</li>
<li>Follow instructions to create webhooks from: <a href="https://slack.com/help/articles/115005265063-Incoming-webhooks-for-Slack">Slack documentation</a></li>
<li>Copy slack webhook from slack API web page.</li>
</ol>
<h4 id="add-notification-channels" tabindex="-1"><a class="header-anchor" href="#add-notification-channels"><span>Add notification channels:</span></a></h4>
<h5 id="matlab-2" tabindex="-1"><a class="header-anchor" href="#matlab-2"><span>MATLAB</span></a></h5>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">new_slack_webhook = struct</span>
<span class="line">new_slack_webhook.webhook_name = (notification channel name)</span>
<span class="line">new_slack_webhook.webhook_url  = (webhook url from slack API)</span>
<span class="line">insert(lab.SlackWebhooks,new_slack_webhook)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="python-2" tabindex="-1"><a class="header-anchor" href="#python-2"><span>Python</span></a></h5>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">lab = dj.create_virtual_module('lab', 'u19_lab')</span>
<span class="line">new_slack_webhook = dict()</span>
<span class="line">new_slack_webhook['webhook_name'] = (notification channel name)</span>
<span class="line">new_slack_webhook['webhook_url']  = (webhook url from slack API)</span>
<span class="line">lab.SlackWebhooks.insert1(new_slack_webhook)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="update-user-channel-webhook-notification-channels" tabindex="-1"><a class="header-anchor" href="#update-user-channel-webhook-notification-channels"><span>Update user channel webhook notification channels:</span></a></h4>
<h5 id="matlab-3" tabindex="-1"><a class="header-anchor" href="#matlab-3"><span>MATLAB</span></a></h5>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">user = struct</span>
<span class="line">user.user_id = (NETID of user)</span>
<span class="line">update(lab.User &amp; user,'slack_webhook', (webhook url from slack API))</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="python-3" tabindex="-1"><a class="header-anchor" href="#python-3"><span>Python</span></a></h5>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">lab = dj.create_virtual_module('lab', 'u19_lab')</span>
<span class="line">user = dict()</span>
<span class="line">user['user_id'] = (NETID of user)</span>
<span class="line">user['slack_webhook'] = (webhook url from slack API)</span>
<span class="line">lab.User.update1(user)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


