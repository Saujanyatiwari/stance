import { useApp } from '../../context/AppContext';

export function IncomingMessage() {
  const { incomingMessage, setIncomingMessage } = useApp();

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-text-primary">
        Incoming Message
        <span className="text-[#e8382a] ml-1">*</span>
      </label>
      <p className="text-xs text-text-muted">Paste the exact message you received.</p>
      <textarea
        id="incoming-message"
        value={incomingMessage}
        onChange={(e) => setIncomingMessage(e.target.value)}
        placeholder="Paste the message here…"
        rows={8}
        className="w-full bg-surface-2 border border-border rounded-[8px] px-4 py-3 text-[16px] text-text-primary placeholder:text-[#2e2e2e] focus:outline-none focus:ring-2 focus:ring-[rgba(232,56,42,0.15)] focus:border-[#e8382a] resize-none transition-all leading-relaxed"
      />
      {incomingMessage.length > 0 && (
        <p className="text-[11px] text-[#444444] text-right">{incomingMessage.length} characters</p>
      )}
    </div>
  );
}
